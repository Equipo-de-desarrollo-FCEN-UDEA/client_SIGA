"use client";

import { RouteGuard } from '@/core/components/RouteGuard';

export default function VotingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard requiredRoles={['admin', 'coordinator', 'professor']}>
      {children}
    </RouteGuard>
  );
}