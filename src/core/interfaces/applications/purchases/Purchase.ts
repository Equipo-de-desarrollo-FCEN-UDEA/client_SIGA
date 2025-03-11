/* eslint-disable no-unused-vars */
import UserApplicationStatus from "@/core/interfaces/applications/applicationsStatus";
import { UUID } from "crypto";

interface AnnualPlan {
    is_true: boolean;
    code: string | null;
}

interface BankConsultation {
    is_true: boolean;
    code: string | null;
}

export interface PriorConsultation {
    annual_plan: AnnualPlan | null;
    bank_consultation: BankConsultation | null;
    contract: string | null;
}

export interface Material {
    id: UUID;
    name: string;
    quantity: number;
    unit_price: string;
}

export interface Provider {
    id: UUID;
    name: string;
    email: string;
    phone: string;
}

export enum PurchaseType {
    SMALL = 'Menor cuantía',
    MeDIUM = 'Mediana cuantía',
    LARGE = 'Mayor cuantía',
}

const EXTENSION = process.env.NEXT_PUBLIC_EXTENSION_ID as string;
const CIEN = process.env.NEXT_PUBLIC_CIEN_ID as string;
const DECANATURA = process.env.NEXT_PUBLIC_FCEN_ID as string;

export const AcademicsUnit = {
    "Centro de Extensión": EXTENSION ,
    "CIEN": CIEN,
    "Decanatura": DECANATURA,
  } as const;

export enum PurchaseScope {
    NATIONAL = 'Nacional',
    INTERNATIONAL = 'Internacional',
}

export interface PurchaseComplete{
    responsible_condition: string;
    marco_agreement: boolean;
    prior_consultation: PriorConsultation;
}

export interface Purchase {
    id: UUID | null;
    type: PurchaseType;
    scope: PurchaseScope;
    need: string;
    description: string;
    responsible_condition: string | null;
    estimated_budget: number;
    marco_agreement: boolean | null;
    status: UserApplicationStatus[];
    prior_consultation: PriorConsultation | null;
    selected_provider: Provider | null;
    materials: Material[] | null;
}

