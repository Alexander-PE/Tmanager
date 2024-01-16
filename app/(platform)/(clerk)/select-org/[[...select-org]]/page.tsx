import { OrganizationList } from "@clerk/nextjs";

const CreateOrganization = () => {
  return (
    <OrganizationList 
      hidePersonal 
      afterSelectOrganizationUrl="/organization/:id" 
      afterCreateOrganizationUrl="/organization/:id"
    />
  )
}

export default CreateOrganization
