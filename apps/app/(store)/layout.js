import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export default function StoreLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <ChatWidget />
      <Footer />
    </>
  );
}
