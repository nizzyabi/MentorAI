// Imports
import { Redis } from "@upstash/redis";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeClient } from "@pinecone-database/pinecone";
import { PineconeStore } from "langchain/vectorstores/pinecone";

// Mentor Key
export type MentorKey = {
    mentorName: string;
    modelName: string;
    userId: string;
};

// Memory Manager
export class MemoryManager {
    // Singleton instance
    private static instance: MemoryManager;
    
    // Redis history store
    private history: Redis;
    
    // Pinecone database client
    private vectorDBClient: PineconeClient;
  
    public constructor() {
        // Initialize Redis history store
        this.history = Redis.fromEnv();
        
        // Initialize Pinecone database client
        this.vectorDBClient = new PineconeClient();
    }

    // Initialize the Pinecone database client
    public async init() {
        if (this.vectorDBClient instanceof PineconeClient) {
            // Initialize the client with API key and environment from environment variables
            await this.vectorDBClient.init({
                apiKey: process.env.PINECONE_API_KEY!,
                environment: process.env.PINECONE_ENVIRONMENT!,
            });
        }
    }

    // Perform a vector search
    public async vectorSearch(recentChatHistory: string, mentorFileName: string) {
        // Cast vectorDBClient to PineconeClient
        const pineconeClient = <PineconeClient>this.vectorDBClient;

        // Get the Pinecone index
        const pineconeIndex = pineconeClient.Index(
            process.env.PINECONE_INDEX! || ""
        );

        // Create a PineconeStore from an existing index and OpenAI embeddings
        const vectorStore = await PineconeStore.fromExistingIndex(
            new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
            { pineconeIndex }
        );

        // Look for something similar using similaritySearch
        const similarDocs = await vectorStore
            .similaritySearch(recentChatHistory, 3, { fileName: mentorFileName })
            .catch((err) => {
                // Handle and log any errors
                console.log("Failed to get vector search results", err);
            });

        return similarDocs;
    }

    public static async getInstance(): Promise<MemoryManager> {
        // Generate instance of memory manager if it doesn't exist
        if (!MemoryManager.instance) {
            MemoryManager.instance = new MemoryManager();
            await MemoryManager.instance.init();
        }

        return MemoryManager.instance;
    }

    // Save a chat history
    private generateRedisMentorKey(mentorKey: MentorKey): string {
        // return name(mentor)-modelName(Llamma)-userId(user)
        return `${mentorKey.mentorName}-${mentorKey.modelName}-${mentorKey.userId}`
    }

    // Function to browse through history
    public async writeToHistory(text: string, mentorKey: MentorKey) {
        if (!mentorKey || typeof mentorKey.userId === "undefined") {
            console.log("Mentor key set incorrectly");
            return "";
        }

        // Generate Key
        const key = this.generateRedisMentorKey(mentorKey);
        const result = await this.history.zadd(key, {
            score: Date.now(),
            member: text,
        })

        return result;
    }

    // Function to read from history
    public async readLatestHistory(mentorKey: MentorKey): Promise<string> {
        if (!mentorKey || typeof mentorKey.userId == "undefined") {
            console.log("Mentor key set incorrectly");
            return "";
        }
        // fetch history using Redis
        const key = this.generateRedisMentorKey(mentorKey);
        let result = await this.history.zrange(key, 0, Date.now(), {
            byScore: true,
        });
        result = result.slice(-30).reverse();
        const recentChats = result.reverse().join("\n");
        return recentChats;
    }

    // Function to see chat history
    public async seedChatHistory(
        seedContent: string,
        delimiter: string = "\n",
        mentorKey: MentorKey
    ) {
        const key = this.generateRedisMentorKey(mentorKey);

        if (await this.history.exists(key)) {
            console.log("Already has chat history");
            return;
        }

        const content = seedContent.split(delimiter);
        let counter = 0;

        for(const line of content) {
            await this.history.zadd(key, { score: counter, member: line});
            counter += 1;
        }
    }
}
