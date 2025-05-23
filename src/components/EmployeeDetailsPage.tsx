import EmployeeCard from './EmployeeCard'
import EmployeeTabs from './EmployeeTabs'
import NotesSection from './NotesSection'

const EmployeeDetailsPage = () => {
  return (
    <>
      <EmployeeCard />
      <div className="flex flex-col md:flex-row gap-4">

      <div className="w-full md:w-[70%] mb-6 md:mb-0">
        <EmployeeTabs />
      </div>
      <div className="w-full md:w-[30%]">
        <NotesSection />
      </div>
      </div>
    </>
  )
}

export default EmployeeDetailsPage
