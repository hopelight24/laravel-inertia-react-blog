import FeatherIcon from "feather-icons-react";
import { For } from "@/utils";
import { Link } from "@inertiajs/inertia-react";

const dataFooterLink = [
  { name: "Home", path: "/" },
  { name: "About", path: "/" },
  { name: "Service", path: "/" },
  { name: "Contact", path: "/" },
];

const dataFooterIcon = [
  { icon: "github", path: "https://github.com/hopelight24/laravel-inertia-react-blog" },
  { icon: "twitter", path: "https://twitter.com/sazzadopu24" },
  { icon: "linkedin", path: "https://www.linkedin.com/in/sazzad-mahmud-hopelight24/" },
  { icon: "instagram", path: "#" },
];

const FooterLink = () => (
  <For
    each={dataFooterLink}
    render={({ name, path }, index) => (
      <Link
        key={index}
        href={path}
        className="link link-hover text-base md:text-lg font-semibold"
      >
        {name}
      </Link>
    )}
  />
);

const FooterIcon = () => (
  <For
    each={dataFooterIcon}
    render={({ icon, path }, index) => (
      <a key={index} href={path} target="_blank">
        <FeatherIcon icon={icon} size={24} />
      </a>
    )}
  />
);

const getDate = () => {
  let d = new Date();
 return  d.getFullYear() 
}

const FooterText = () => (
  <p>Copyright © {getDate()} - All right reserved by Sazzad Mahmud</p>
);

const Footer = () => (
  <footer className="footer footer-center p-10 bg-danger text-white">
    <div className="grid grid-flow-col gap-4">
      <FooterLink />
    </div>
    <div className="grid grid-flow-col gap-4">
      <FooterIcon />
    </div>
    <div className="text-base md:text-lg font-semibold">
      <FooterText />
    </div>
  </footer>
);

export default Footer;
