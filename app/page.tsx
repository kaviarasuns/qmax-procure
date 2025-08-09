import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero (single-column with logo) */}
        <section className="relative overflow-hidden min-h-screen flex items-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/60" />
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 md:px-6 lg:py-24">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{"Procurement, streamlined for Qmax Systems"}</span>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src="https://d1yetprhniwywz.cloudfront.net/QMAXSYSTEMS-new-logo.svg"
                  alt="Qmax Systems logo"
                  width={260}
                  height={64}
                  className="h-10 w-auto md:h-12"
                  priority
                />
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {"From request to payment—manage it all in one place."}
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
                {
                  "Create equipment requirements lists, route approvals, issue purchase orders, and process payments with full visibility and auditability across the entire procurement lifecycle."
                }
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
                <Button asChild size="lg">
                  <Link
                    href="/auth/login"
                    aria-label="Sign in to Qmax Systems Procurement"
                  >
                    {"Sign in"}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-muted-foreground">
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>{"Role-based access"}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span>{"Audit-ready records"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-2" />
      </main>
    </>
  );
}
