import { Form, Input, Button, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function UserForm() {
   const queryClient = useQueryClient();
   const mutation = useMutation({
      mutationFn: async (newUser) => {
         const res = await fetch('http://localhost:4000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser),
         });
         return res.json();
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries(['users']);
         message.success('User added successfully ✅');
         console.log(data); // data optional
      },
      onError: (error) => {
         message.error(`Error: ${error.message}`); // antd toast
      },
   });

   const onFinish = (values) => {
      mutation.mutate(values);
   };

   return (
      <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: 400 }}>
         {mutation.isIdle && <p>Form not submitted yet</p>}
         {mutation.isLoading && <p>Submitting...</p>}
         {mutation.isError && <p>Error: {mutation.error.message}</p>}
         {mutation.isSuccess && <p>Success! Added {mutation.data.name}</p>}
         <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
         </Form.Item>
         <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: 'email' }]}
         >
            <Input />
         </Form.Item>
         <Form.Item>
            <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
               Add User
            </Button>
         </Form.Item>
         {mutation.isError && (
            <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>
         )}
      </Form>
   );
}

export default UserForm;
