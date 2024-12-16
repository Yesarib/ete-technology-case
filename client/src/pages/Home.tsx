import { useEffect, useState } from 'react'
import { companyService } from '../api/company'
import { Company } from '../types/company'
import { ErrorResponse } from '../types/error';
import { Card, Typography } from 'antd';

const Home = () => {
  const [companies, setCompanies] = useState<Company[] | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  
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

  const lastThreeCompany = companies?.sort((a,b) => {
    if(a.createdAt && b.createdAt) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else {
      return 0
    }
  })
  

  useEffect(() => {
    getCompanies()
  }, [])
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='lg:w-1/2 flex flex-col justify-center items-center p-4'>
        <div className='w-full flex justify-center items-center gap-4'>
          {error && <p>{error}</p>}
          <Card className='lg:w-96 ' title="Total number of companies in the system" bordered={true}>
            <Typography className='flex justify-end'>
              <Typography.Title level={2}>
                {companies?.length}
              </Typography.Title>
            </Typography>
          </Card>
          <Card className='w-96' title="Last Added 3 companies" bordered={true}>
            <Typography className='flex'>
              <Typography.Title level={5}>
                {lastThreeCompany?.map((company) => (
                  <div className='flex gap-2'>
                    <Typography.Paragraph className='text-blue-600'> {company.name} </Typography.Paragraph>
                    <Typography.Paragraph> - {company.legalNumber} </Typography.Paragraph>
                  </div>
                ))}
              </Typography.Title>
            </Typography>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Home
