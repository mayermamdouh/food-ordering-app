const Footer = () => {
  const copyRight = "© 2025 Your Website. All rights reserved.";

  return (
    <footer className="border-t p-8 text-center text-accent mt-6 ">
      <div className="container mx-auto">
        <p>{copyRight}</p>
      </div>
    </footer>
  );
};

export default Footer;
