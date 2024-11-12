import { useUser } from "@clerk/clerk-react";
import FinancialRecordList from "./FinancialRecordList";
import FinancialRecordFrom from "./FinancialRecordForm";
import { useFinancialRecords } from "../../context/financial-record-context";
import { useMemo } from "react";


export const Dashboard = () => {
  const { user } = useUser();

  const {records} = useFinancialRecords();

  const monthlyTotal = useMemo(() => {
    let totalAmt = 0;
    records.forEach((record) => {
      totalAmt += record.amount;
    })
    return totalAmt;
  }, [records])

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your Finances:</h1>
      <FinancialRecordFrom />
      <div>Monthly Total: ${monthlyTotal}</div>
      <FinancialRecordList />
    </div>
  );
};
