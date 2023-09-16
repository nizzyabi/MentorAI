// We are using this layout to wrap the auth pages and to make a common pattern for creating layouts. It will reflect to ALL the routes within the (auth folder)
const AuthLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    )
}

export default AuthLayout
