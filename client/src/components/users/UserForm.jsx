import { Form, Input, Button, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
      <div className="m-8 flex justify-center items-center">
         <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
               Add User
            </h2>
            <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: 400 }} >
               <p className="text-gray-600 dark:text-white mb-4">
               {mutation.isIdle && 'Form not submitted yet'}
               {mutation.isLoading && 'Submitting...'}
               {mutation.isError && `Error:  ${mutation.error.message}`}
               {mutation.isSuccess && `Success! Added ${mutation.data.name}`}
               </p>
               <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input data-testid="user-name-input" className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
               </Form.Item>
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email' }]}
               >
                  <Input data-testid="user-email-input" className="border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md" />
               </Form.Item>
               <Form.Item>
                  <Button data-testid="add-user-button" type="primary" htmlType="submit" loading={mutation.isLoading} className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" >
                     Add User
                  </Button>
               </Form.Item>
               {mutation.isError && (
                  <p style={{ color: 'red' }}>Something went wrong. Please try again.</p>
               )}
            </Form>
         </div>
      </div>
   );
}

export default UserForm;
