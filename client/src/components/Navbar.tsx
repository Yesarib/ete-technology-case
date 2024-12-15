import { Link } from 'react-router-dom'
import { parseJwt } from '../utils/decode-jwt'
import { useEffect, useState } from 'react';
import { User } from '../types/user';
import { getUserById } from '../api/user';
import { ErrorResponse } from '../types/error';
import { Button, Dropdown, Menu, Typography } from 'antd';

interface DecodedToken {
    aud: string,
    exp: Date,
    iat: Date,
    iss: string,
    userName: string
}

const Navbar = () => {
    const token = localStorage.getItem('token')
    const decodedToken: DecodedToken = parseJwt(token);
    const [user, setUser] = useState<User | null>()
    const [error, setError] = useState<string | undefined>(undefined);

    const getUser = async () => {
        const response = await getUserById(decodedToken.aud)
        if ((response as ErrorResponse).message) {
            setError((response as ErrorResponse).message)
            setUser(undefined)
        } else {
            setError(undefined)
            setUser(response as User)
        }
    }

    useEffect(() => {
        getUser();
    }, [token])

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        window.location.href = '/';
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="logout" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='w-full fixed top-0 left-0 z-50 justify-center items-center flex mt-2'>
            <div className="w-1/2 flex justify-between items-center">
                <div className='flex gap-8'>
                    <Link to={'/home'} className='bg-gray-200/50 px-8 py-2 rounded-xl flex hover:bg-gray-800 hover:text-white text-center justify-center items-center text-xl'>
                        Home
                    </Link>
                    <Link to={'/companies'} className='bg-gray-200/50 px-8 py-2 rounded-xl flex hover:bg-gray-800 hover:text-white text-center justify-center items-center text-xl'>
                        Companies
                    </Link>
                    <Link to={'/products'} className='bg-gray-200/50 px-8 py-2 rounded-xl flex hover:bg-gray-800 hover:text-white text-center justify-center items-center text-xl'>
                        Products
                    </Link>
                </div>
                {error && <Typography> <Typography.Text> {error} </Typography.Text> </Typography>}
                <div className='flex'>
                    {user ? (
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            <Button type="text">{user.userName}</Button>
                        </Dropdown>
                    ) : (
                        <Link to={'/'} className='bg-gray-200/50 px-8 py-2 rounded-xl flex hover:bg-gray-800 hover:text-white text-center justify-center items-center text-xl'>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar