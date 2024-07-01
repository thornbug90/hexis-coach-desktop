import activities from "hexis/constants/activities";

export interface IWorkoutField {
  activity?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function WorkoutField({ activity }: IWorkoutField) {
  const { icon: Icon } = activities?.[activity?.id as keyof typeof activities] || [];

  return (
    <div className="mt-4 mb-3 w-full min-h-12 p-3 rounded-lg flex items-center space-x-5 bg-background-300 outline-0 text-white">
      <div className="pl-3 w-12 flex justify-center bg-contain">{Icon && <Icon color="#359CEF" />}</div>
      <div>
        <h3 className="text-base font-medium">{activity?.name}</h3>
      </div>
    </div>
  );
}
