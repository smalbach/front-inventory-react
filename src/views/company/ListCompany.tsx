import { Table, TableBody, TableHead, TableHeaders, TableRow } from 'components/Tables';
import { useEffect, useState } from 'react';

import Card from 'components/card';
import { CompanyModel } from 'modules/company/models/Company';
import DetailCompany from './DetailCompany';
import { UpdateCompany } from './UpdateCompany';
import { getCompanies } from 'modules/company/requests/_requests';

const ListCompany = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [reload, setReload] = useState(false);
  const [companies, setCompanies] = useState<Array<CompanyModel>>([]);
  const [company, setCompany] = useState<CompanyModel>(null);


  useEffect(() => {
    if(!isEditing || reload){
      setReload(false);
      getCompanies().then((res) => {
        setCompanies(res);
      });
    }
  },[isEditing, reload]);

  if(isEditing) {
    return <UpdateCompany company={company} setIsEditing={setIsEditing} />
  }

  return (
    <div>
      <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        Listar empresas
      </div>

      <div className="flex h-full w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaders>
                Nombre
              </TableHeaders>
              <TableHeaders>
                Dirección
              </TableHeaders>
              <TableHeaders>
                NIT
              </TableHeaders>
              <TableHeaders>
                Teléfono
              </TableHeaders>
              <TableHeaders>
              </TableHeaders>
              <TableHeaders>
              </TableHeaders>
            </TableRow>
          </TableHead>

          <TableBody>

          {companies && companies.map((company) => (
            <DetailCompany
            company={company}
            setIsEditing={setIsEditing}
            setCompany={setCompany}
            setReload={setReload}
            key={company.id}  />
          ))}
          </TableBody>
        </Table>

      </div>
    </Card>
    </div>
  );
};

export default ListCompany;