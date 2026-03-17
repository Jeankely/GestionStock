export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/images/logo/hero.png"
            alt="Jk TechStore Logo"
            style={{ width: "96px", height: "70px" }}
        />
    );
}