import React, { useEffect } from 'react'
import { Company } from '../../types/company'
import { Button, Form, FormProps, Input, Typography } from 'antd'
import { companyService } from '../../api/company'

interface CompanyFormsProps {
    company?: Company | null
}

type FieldType = {
    _id: string,
    name: string,
    legalNumber: number,
    country: string,
    website: string,
}

const CompanyForms: React.FC<CompanyFormsProps> = ({ company }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (company) {
            form.setFieldsValue({
                name: company.name,
                legalNumber: company.legalNumber,
                country: company.country,
                website: company.website,
            });
        }
    }, [company, form]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        // console.log('Success:', values);
        const formData = values
        let response = {}
        if (company) {
            response = await companyService.updateCompany(company._id, formData)
        } else {
            response = await companyService.newCompany(formData)
        }

        if (!response) {
            alert("")
        }
        
        window.location.reload();
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                    rules={[{ required: true, message: 'Please input company name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Legal Number"
                    name="legalNumber"
                    rules={[{ required: true, message: 'Please input company legal number!' }]}
                >
                    <Input type='number' />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please input company country!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Website"
                    name="website"
                    rules={[{ required: true, message: 'Please input companys website!' }]}
                >
                    <Input />
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

export default CompanyForms