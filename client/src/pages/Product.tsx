import { useEffect, useState } from 'react'
import { Product } from '../types/product'
import { useNavigate } from 'react-router-dom';
import { productService } from '../api/product';
import { ErrorResponse } from '../types/error';
import { Button, Modal, Space, Table, TableProps, Typography } from 'antd';
import ProductForms from '../components/products/ProductForms';
import { PlusOutlined, ProductOutlined } from '@ant-design/icons';

interface DataType extends Product {
    key?: string
}

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [newProductModal, setNewProductModal] = useState(false);
    const [updateProductModal, setUpdateProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const getProducts = async () => {
        const response = await productService.getProducts();

        if ((response as ErrorResponse).message) {
            setError((response as ErrorResponse).message)
            setProducts(undefined)
        } else {
            setError(undefined)
            setProducts(response as Product[])
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
        getProducts()
    }, [navigate]);

    const showModal = (state: string, product?: Product) => {
        if (state === 'new') {
            setNewProductModal(true);
        } else if (product) {
            setUpdateProductModal(true)
            setSelectedProduct(product)
        }
    };

    const handleCancel = () => {
        setNewProductModal(false);
        setUpdateProductModal(false);
    };

    const handleDelete = async (productId: string) => {
        const response = await productService.deleteProduct(productId)
        console.log(response);
        window.location.reload()
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (_, record) => {
                return (
                    <Typography> {record.company.name} </Typography>
                )
            }
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => {
                const date = record?.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A';
                return (
                    <Typography> {date} </Typography>
                );
            },
            sorter: (a, b) => {
                if (a.createdAt && b.createdAt) {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                } else {
                    return 0
                }
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal('edit', record)}> Edit </Button>
                    <Button onClick={() => handleDelete(record._id)}> Delete </Button>
                </Space>
            ),
        },
    ];

    const data: DataType[] | undefined = products

    return (
        <div className='w-full flex justify-center items-center mt-4'>
            <div className='lg:w-2/3 flex flex-col justify-center items-center'>
                <div className='w-full flex justify-between items-center p-4 bg-gray-200/30 rounded-xl'>
                    <div className='flex gap-2'>
                        <div className='w-16 h-16 flex justify-center items-center rounded-md bg-gradient-to-bl from-blue-600 to-blue-300'>
                            <ProductOutlined className='text-4xl text-white' />
                        </div>
                        <Typography className='flex flex-col'>
                            <Typography.Title level={4} > Products </Typography.Title>
                            <Typography.Paragraph> You can organize your products from this screen. </Typography.Paragraph>
                        </Typography>
                    </div>
                    <div>
                        <Button className='flex justify-center items-center' onClick={() => showModal('new')}>
                            <PlusOutlined />
                            <Typography.Text> New Product </Typography.Text>
                        </Button>
                    </div>
                </div>
                <div className='mt-2'>
                    {error && <p>{error}</p>}
                    <Table<DataType> columns={columns} dataSource={data} />
                </div>
                <Modal footer={null} title="Company Information" open={newProductModal} onCancel={handleCancel}>
                    <ProductForms />
                </Modal>
                <Modal footer={null} title="Company Information" open={updateProductModal} onCancel={handleCancel}>
                    <ProductForms product={selectedProduct} />
                </Modal>
            </div>
        </div>
    )
}

export default Products