import { GoalGainIcon, GoalLoseIcon, GoalMaintainIcon } from "../icons/general";
import Pagination from "hexis/app/components/pagination";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedClient } from "hexis/state/user/slice";
import { Goal, SEX } from "hexis/constants/user";
import { useAppSelector } from "hexis/hooks/useRedux";
import isEmpty from "lodash/isEmpty";
import { GetAllActiveClientsQuery } from "hexis/generated/graphql";
import ClientNotFound from "./client-not-found";
import { weightUnitConverter } from "hexis/utils/weightUnitConverter";

type Props = {
  allClients: GetAllActiveClientsQuery["getMyChildren"];
};

export default function AllClientsTable({ allClients }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useAppSelector(({ user: { loading, user, coachClients, clientsFilter, searchQuery, selectedClient } }) => ({
    loading,
    coachClients,
    clientsFilter,
    user,
    searchQuery,
    selectedClient,
  }));

  const icon = (goal: Goal) => {
    switch (goal) {
      case Goal.Gain:
        return <GoalGainIcon />;
      case Goal.Lose:
        return <GoalLoseIcon />;
      case Goal.Maintain:
        return <GoalMaintainIcon />;
    }
  };

  const calculateAge = (dob: string) => dayjs().diff(dob, "year");

  const handleNavigation = (client?: GetAllActiveClientsQuery["getMyChildren"][0]) => () => {
    dispatch(setSelectedClient(client!));
    router.push(`client-fuel-plan`);
  };

  return (
    <div>
      <div className="overflow-x-auto w-full h-full px-8 bg-background-500">
        <table className="table w-full">
          {/* head */}
          <thead className=" h-[73px] text-sm underline text-white opacity-40">
            <tr className="border-none">
              <th className="font-light">Name</th>
              <th className="font-light">Age</th>
              <th className="font-light">Gender</th>
              <th className="font-light">Primary Sport</th>
              <th className="font-light">Body weight</th>
              <th className="font-light">Body Fat</th>
              <th className="font-light">Goal</th>
            </tr>
          </thead>
          <tbody className=" bg-background-400">
            {allClients &&
              !isEmpty(allClients) &&
              [...allClients]
                ?.sort((a, b) => {
                  let nameA = a?.firstName.toUpperCase() || ""; // ignore upper and lowercase
                  let nameB = b?.firstName.toUpperCase() || ""; // ignore upper and lowercase
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  // names must be equal
                  return 0;
                })
                ?.map(client => {
                  return (
                    <tr
                      onClick={handleNavigation(client)}
                      className=" hover:bg-background-300 cursor-pointer border-b-1 border-b-background-300 text-sm"
                      key={client?.id}
                    >
                      <td className="py-5">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask w-8 h-8 bg-activeblue-200 rounded-full"></div>
                          </div>
                          <div>
                            <div className="font-semibold pl-4">
                              {client?.firstName} {client?.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{client?.dob ? calculateAge(client?.dob) : "-"}</td>
                      <td>{client?.sex ? SEX[client.sex] : "-"}</td>
                      <td>{client?.favouriteActivities?.[0]?.activity.name || "-"}</td>
                      <td>{client?.weight ? `${weightUnitConverter(client?.weightUnit, client?.weight)}` : "-"}</td>
                      <td className="text-white text-xs opacity-40">Coming soon</td>
                      <td>{client?.goal ? icon(client.goal) : "-"}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {isEmpty(allClients) && <ClientNotFound />}
      </div>
      {!loading && <Pagination />}
    </div>
  );
}
