import React, { useEffect, useState } from 'react'
import { Product } from '../../types/product'
import { Button, Form, FormProps, Input, Select, Typography } from 'antd'
import { productService } from '../../api/product'
import { Company } from '../../types/company'
import { companyService } from '../../api/company'
import { ErrorResponse } from '../../types/error'

interface ProductFormsProps {
    product?: Product | null
}

type FieldType = {
    _id: string,
    name: string,
    category: string,
    amount: number,
    unit: string,
    company: Company
}

const ProductForms: React.FC<ProductFormsProps> = ({ product }) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState<Company[] | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [selectedCompany, setSelectedCompany] = useState<string>(product?.company._id || '');
    const getCompanies = async () => {
        const response = await companyService.getCompanies();

        if ((response as ErrorResponse).message) {
            setError((response as ErrorResponse).message)
            setCompanies(undefined)
        } else {
            setError(undefined)
            setCompanies(response as Company[])
        }
    }
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                category: product.category,
                amount: product.amount,
                unit: product.unit,
                company: product.company.name
            });
        }
        getCompanies()
    }, [product, form]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // console.log('Success:', values);
        const formData = {
            ...values,
            selectedCompany,
        };

        let response = {}
        if (product) {
            response = await productService.updateProduct(product._id, formData)
        } else {
            response = await productService.newProduct(formData)
        }

        if (!response) {
            alert("")
        }

        window.location.reload();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onChange = (value: string) => {
        setSelectedCompany(value)
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    return (
        <div className='w-full flex flex-col p-2'>
            <Typography>
                <Typography.Title level={2}>
                    Ete Technology
                </Typography.Title>
            </Typography>
            <Form
                form={form}
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
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input product name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please input product category!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: 'Please input product amount!' }]}
                >
                    <Input type='number' />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Unit"
                    name="unit"
                    rules={[{ required: true, message: 'Please input products unit!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Company"
                    name="company"
                    rules={[{ required: true, message: 'Please input products unit!' }]}
                >
                    {error && <Typography> There is an error when companies Information </Typography>}
                    <Select
                        showSearch
                        placeholder="Select a person"
                        optionFilterProp="label"
                        onChange={onChange}
                        onSearch={onSearch}
                        options={companies?.map((company) => {
                            return {
                                value: company._id,
                                label: company.name
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item label={null} style={{ marginTop: 32 }} className='flex justify-end mr-12'>
                    <Button type="primary" htmlType="submit" size='large' shape='default' style={{ width: '9rem' }}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ProductForms