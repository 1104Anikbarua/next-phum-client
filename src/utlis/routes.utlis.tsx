import { NavLink } from "react-router-dom";
import { TItems, TRoute, TSidebarRoute } from "../types/types";

export const getGenratedRoutes = (items: TItems[]) => {
  const routes = items?.reduce((previous: TRoute[], current) => {
    if (current?.path && current?.element) {
      previous.push({
        path: current?.path,
        element: current?.element,
      });
    }
    if (current?.children) {
      current?.children.forEach((child) => {
        previous.push({
          path: child.path!,
          element: child?.element,
        });
      });
    }
    return previous;
  }, []);
  return routes;
};

export const getSidebarRoutes = (items: TItems[], role: string) => {
  const sidebarRoutes = items?.reduce((previous: TSidebarRoute[], current) => {
    if (current?.name && current?.path) {
      previous.push({
        key: current.name,
        label: (
          <NavLink to={`/${role}/${current?.path}`}>{current.name}</NavLink>
        ),
      });
    }
    if (current?.children) {
      previous.push({
        key: current?.name,
        label: current?.name,
        children: current?.children?.map((child) => {
          if (child?.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child?.name}</NavLink>
              ),
            };
          }
        }),

        //
      });
    }
    return previous;
  }, []);

  return sidebarRoutes;
};
