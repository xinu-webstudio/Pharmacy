import { Icon } from "@iconify/react/dist/iconify.js";
import { Text } from "../components";

export const Navbar = () => {
  return (
    <div className="flex place-items-center justify-between gap-16 py-3 px-6 shadow-sm w-full">
      <section className="flex place-items-center border border-border rounded-lg py-3 px-4 gap-4 flex-1">
        <Icon icon="mynaui:search" fontSize={12} color="gray" />
        <input type="text" className="outline-none" placeholder="Search" />
      </section>

      <section className="flex">
        <div className="rounded-full bg-bg">
          <Icon icon="tdesign:notification" fontSize={24} />
        </div>
      </section>

      <section className="flex place-items-center gap-3  ">
        <div className="flex place-items-center gap-3 ">
          <img
            className="w-12 h-10 rounded"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="pp"
          />

          <section className="flex flex-col gap-1">
            <Text variant="silver-950" size="body-sm-default">
              Farjad
            </Text>
            <Text variant="silver-600" size="body-xs-mid">
              Admin
            </Text>
          </section>
        </div>
        <Icon icon="oui:arrow-down" fontSize={16} />
      </section>

      <section className="w-[.1px] bg-bg h-full" />

      <section>
        <Icon icon="mdi-light:settings" fontSize={28} />
      </section>
    </div>
  );
};

export default Navbar;
