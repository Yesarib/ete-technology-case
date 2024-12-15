import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import { register } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const response = await register(values.username, values.password)

    if ('message' in response) {
      console.log(response.message);
      alert(response.message);
      return;
    }

    localStorage.setItem('token', response.token);
    navigate('/companies')
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='w-full flex flex-col'>
      <Typography>
        <Typography.Title level={2}>
          Ete Technology
        </Typography.Title>
        <Typography.Paragraph>
          You can register with your username and password
        </Typography.Paragraph>
      </Typography>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" size='large' shape='default' style={{ width: '9rem' }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register