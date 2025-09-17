"use client";

import { RouteGuard } from '@/core/components/RouteGuard';

export default function ApplicationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requiredRoles={['admin', 'coordinator', 'student', 'evaluator']}>
      {children}
    </RouteGuard>
  );
}