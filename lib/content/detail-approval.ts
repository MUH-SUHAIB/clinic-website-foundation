import { createHash } from "node:crypto";

export interface ContentReview {
  readonly reviewer: string;
  readonly role: string;
  readonly reviewedAt: string; // Actual YYYY-MM-DD review date in UTC.
  readonly evidenceReference: string; // Safe internal reference, never public evidence/documents.
}

export interface DetailApproval {
  readonly status: "draft" | "approved";
  readonly substantiveBilingualContent: boolean;
  readonly contentDigest: string;
  readonly owner: ContentReview;
  readonly clinical: ContentReview;
  readonly editorial: ContentReview;
}

// Content integrity only: not authentication or proof of genuine medical review.
export function getContentDigest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function nonempty(value: string): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function validReview(review: ContentReview): boolean {
  if (!review) return false;
  return [review.reviewer, review.role, review.evidenceReference].every(nonempty) &&
    /^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt) &&
    Number.isFinite(Date.parse(review.reviewedAt)) &&
    new Date(review.reviewedAt).toISOString().slice(0, 10) === review.reviewedAt &&
    review.reviewedAt <= new Date().toISOString().slice(0, 10);
}

export function hasCurrentApproval(approval: DetailApproval | undefined, digest: string): boolean {
  return !!approval && approval.status === "approved" && approval.substantiveBilingualContent &&
    [approval.owner, approval.clinical, approval.editorial].every(validReview) &&
    approval.contentDigest === digest;
}
