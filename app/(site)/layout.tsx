import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/*
        Dipasang di layout (site), bukan root layout: root membungkus /studio
        juga, sehingga sesi pengelolaan konten akan tercatat sebagai pageview
        situs publik.
      */}
      <GoogleAnalytics />
    </>
  );
}
