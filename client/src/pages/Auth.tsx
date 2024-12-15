import { Tabs, TabsProps } from 'antd'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

const Auth = () => {

    const items: TabsProps['items'] = [
        {
            key: "1",
            label: 'Login',
            children: <Login />,
        },
        {
            key: "2",
            label: 'Register',
            children: <Register />,
        }
    ]

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='lg:w-1/2 h-screen flex items-center justify-center'>
                <div className='flex bg-gray-200/30 p-8 rounded-xl'>
                    <Tabs centered defaultActiveKey="1" items={items} />
                </div>
            </div>
        </div>
    )
}

export default Auth