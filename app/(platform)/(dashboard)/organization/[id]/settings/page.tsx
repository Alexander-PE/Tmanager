import { OrganizationProfile } from "@clerk/nextjs"

const Settings = () => {
  return (
    <div className="w-full ">
      <OrganizationProfile appearance={{
        elements: {
          rootBox: {
            boxShadow: 'none',
            width: '100%',
          },
          card: {
            border: "1px solid #E5E7EB",
            boxShadow: 'none',
            width: '100%',
          }
        }
      }} />
    </div>
  )
}

export default Settings
