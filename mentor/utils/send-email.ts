import { FormData } from '@/components/contact';
import { useRouter } from 'next/navigation';
export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';
  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .catch((err) => {
      alert(err);
    });
}