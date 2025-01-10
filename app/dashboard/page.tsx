import Document from "@/components/Document";

export const dynamic = "force-dynamic";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <h1 className="mx-auto p-4">My Documents</h1>
      <Document />
    </div>
  );
};

export default Dashboard;
