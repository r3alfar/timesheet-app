import Timesheet from "@/components/timesheet/Timesheet";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div className="grid grid-rows-1 mt-4 px-6">
        <h1>Timesheet</h1>
        <Timesheet />
      </div>
    </main>
  );
}
