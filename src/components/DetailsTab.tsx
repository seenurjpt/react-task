import { useSelector } from "react-redux";
import { RootState } from "../store";

const DetailItem = ({
  label,
  value,
  isBold = true,
}: {
  label: string;
  value: string | number | undefined;
  isBold?: boolean;
}) => (
  <div>
    <dt className='text-xs text-gray-500 mb-0.5'>{label}</dt>
    <dd
      className={`text-sm text-gray-700 ${
        isBold ? "font-semibold" : "font-medium"
      }`}
    >
      {value || "-"}
    </dd>
  </div>
);

const DetailsTab = () => {
  const { employeeData } = useSelector((state: RootState) => state.employee);

  const employmentDetails = employeeData.employmentDetails || {};
  const contractDetails = employeeData.contractDetails || {};
  const paymentDetails = employeeData.paymentDetails || {};

  return (
    <div className='space-y-5'>
      <section className='bg-white rounded-lg p-6 border border-gray-200'>
        <h3 className='text-base font-semibold text-gray-800 mb-4'>
          Employment Details
        </h3>
        <dl className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
          <DetailItem label='Client' value={employmentDetails.clientName} />
          <DetailItem label='Location' value={employmentDetails.location} />
          <DetailItem
            label='Employment Type'
            value={employmentDetails.employmentType}
          />
          <DetailItem label='Mode' value={employmentDetails.mode} />
          <DetailItem
            label='Reporting to'
            value={employmentDetails.reportingTo}
          />
        </dl>
      </section>

      <section className='bg-white rounded-lg p-6 border border-gray-200'>
        <h3 className='text-base font-semibold text-gray-800 mb-4'>
          Contract Details
        </h3>
        <dl className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
          <DetailItem
            label='Started working on'
            value={contractDetails.startedOn}
          />
          <DetailItem
            label='Contract starting Date'
            value={contractDetails.contractStartDate}
          />
          <DetailItem
            label='Contract End Date'
            value={contractDetails.contractEndDate}
          />
          <DetailItem
            label='Increment Date'
            value={contractDetails.incrementDate}
          />
        </dl>
      </section>

      <section className='bg-white rounded-lg p-6 border border-gray-200'>
        <h3 className='text-base font-semibold text-gray-800 mb-4'>
          Payment Details
        </h3>
        <dl className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
          <DetailItem
            label='Salary (per month)'
            value={
              paymentDetails.salaryPerMonth
                ? `$${paymentDetails.salaryPerMonth}`
                : undefined
            }
          />
          <DetailItem
            label='Monthly Payment Date'
            value={paymentDetails.monthlyPaymentDate}
          />
          <DetailItem
            label='Invoice cycle ends'
            value={paymentDetails.invoiceCycleEnds}
            isBold
          />
          <DetailItem
            label='Last Increment'
            value={
              paymentDetails.lastIncrementPercent
                ? `${paymentDetails.lastIncrementPercent}%`
                : undefined
            }
          />
        </dl>
      </section>
    </div>
  );
};

export default DetailsTab;
