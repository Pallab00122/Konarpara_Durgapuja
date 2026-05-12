"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import PhotoUploader from "@/components/admin/PhotoUploader";
import PhotoManager from "@/components/admin/PhotoManager";
import AdminStats from "@/components/admin/AdminStats";
import {
  Upload,
  Images,
  BarChart3,
  LogOut,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

type Tab = "upload" | "manage" | "stats";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("upload");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const router = useRouter();
  const supabase = createClient();

  // Check authentication and admin status
  useEffect(() => {
    async function checkAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login?redirect=/admin");
        return;
      }

      setUser(user);
      const adminStatus = user.user_metadata?.is_admin === true;
      setIsAdmin(adminStatus);
      setLoading(false);
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/auth/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Access Denied
          </h1>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            You don&apos;t have admin privileges to access this page. Please
            contact the committee if you believe this is an error.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          >
            Return Home
          </button>
        </div>
      </main>
    );
  }

  const tabs = [
    { id: "upload" as Tab, label: "Upload Photos", icon: Upload },
    { id: "manage" as Tab, label: "Manage Gallery", icon: Images },
    { id: "stats" as Tab, label: "Statistics", icon: BarChart3 },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your Durga Puja photo gallery
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Signed in as{" "}
                <span className="font-medium text-foreground">
                  {user?.email}
                </span>
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-border overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-primary border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "upload" && (
                <PhotoUploader onUploadComplete={triggerRefresh} />
              )}
              {activeTab === "manage" && (
                <PhotoManager refreshTrigger={refreshTrigger} />
              )}
              {activeTab === "stats" && (
                <AdminStats refreshTrigger={refreshTrigger} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
