import { DatabaseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Table, TableProps, Typography } from 'antd';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Company as ICompany } from '../types/company';
import { companyService } from '../api/company';
import { ErrorResponse } from '../types/error';
import CompanyForms from '../components/company/CompanyForms';

interface DataType extends ICompany {
  key?: string;
}

const Company = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<ICompany[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [newCompanyModal, setNewCompanyModal] = useState(false);
  const [updateCompanyModal, setUpdateCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);

  const getCompanies = async () => {
    const response = await companyService.getCompanies();

    if ((response as ErrorResponse).message) {
      setError((response as ErrorResponse).message)
      setCompanies(undefined)
    } else {
      setError(undefined)
      setCompanies(response as ICompany[])
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
    getCompanies()
  }, [navigate]);

  const showModal = (state: string, company?: ICompany) => {
    if (state === 'new') {
      setNewCompanyModal(true);
    } else if (company) {
      setUpdateCompanyModal(true)
      setSelectedCompany(company)
    }
  };

  const handleCancel = () => {
    setNewCompanyModal(false);
    setUpdateCompanyModal(false);
  };

  const handleDelete = async (companyId: string) => {
    const response = await companyService.deleteCompany(companyId)
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
      title: 'Legal Number',
      dataIndex: 'legalNumber',
      key: 'legalNumber',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (_, record) => (
        <Link to={record.website} target='_blank'>
          {record.website}
        </Link>
      ),
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

  const data: DataType[] | undefined = companies

  return (
    <div className='w-full flex justify-center items-center mt-4'>
      <div className='lg:w-2/3 flex flex-col justify-center items-center'>
        <div className='w-full flex justify-between items-center p-4 bg-gray-200/30 rounded-xl'>
          <div className='flex gap-2'>
            <div className='w-16 h-16 flex justify-center items-center rounded-md bg-gradient-to-bl from-blue-600 to-blue-300'>
              <DatabaseOutlined className='text-4xl text-white' />
            </div>
            <Typography className='flex flex-col'>
              <Typography.Title level={4} > Companies </Typography.Title>
              <Typography.Paragraph> You can organize your companies from this screen. </Typography.Paragraph>
            </Typography>
          </div>
          <div>
            <Button className='flex justify-center items-center' onClick={() => showModal('new')}>
              <PlusOutlined />
              <Typography.Text> Yeni Şirket </Typography.Text>
            </Button>
          </div>
        </div>
        <div className='mt-2'>
          {error && <p>{error}</p>}
          <Table<DataType> columns={columns} dataSource={data} />
        </div>
        <Modal footer={null} title="Company Information" open={newCompanyModal} onCancel={handleCancel}>
          <CompanyForms />
        </Modal>
        <Modal footer={null} title="Company Information" open={updateCompanyModal} onCancel={handleCancel}>
          <CompanyForms company={selectedCompany} />
        </Modal>
      </div>
    </div>
  )
}

export default Company