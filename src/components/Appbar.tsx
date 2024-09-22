import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo.jpg";

const Appbar: any = () => {
  return (
    <div className="bg-white h-14 top-0 flex items-center sticky z-50 text-black drop-shadow-md">
      <div className="px-4 w-screen flex items-center p-1 justify-between lg:px-8 md:px-4">
        <div className="flex gap-1">
          <div>
            <div className="flex items-center justify-center hover:cursor-pointer">
              <img
                src={Logo}
                alt=""
                className="h-10 w-40 mr-2"
              />
            </div>
          </div>
        </div>

       <div>
        <Button>About us</Button>
       </div>
        
      </div>
    </div>
  );
};

export default Appbar;
