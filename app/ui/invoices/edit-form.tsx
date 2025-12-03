'use client';

import React, { useActionState } from 'react';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

// --- MOCKED DEPENDENCIES (for self-contained file) ---

// 1. Mocking the required types/interfaces
interface CustomerField {
  id: string;
  name: string;
}

interface InvoiceForm {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
}

interface State {
  message: string | null;
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
}

// 2. Mocking the Button component with Tailwind styling
const Button = ({ children, type }: { children: React.ReactNode, type: 'submit' | 'button' }) => (
  <button
    type={type}
    className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
  >
    {children}
  </button>
);

// 3. Mocking the Server Action 'updateInvoice'
// This simulates form validation and submission logic.
const mockUpdateInvoice = async (id: string, formData: FormData): Promise<State> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const customerId = formData.get('customerId') as string;
  const amountStr = formData.get('amount') as string;
  const status = formData.get('status') as 'pending' | 'paid';
  
  const errors: State['errors'] = {};
  let hasErrors = false;

  // Simple Mock Validation Logic
  if (!customerId || customerId === 'default') {
    errors.customerId = ['Please select a customer.'];
    hasErrors = true;
  }
  if (!amountStr || parseFloat(amountStr) <= 0) {
    errors.amount = ['Please enter an amount greater than $0.'];
    hasErrors = true;
  }
  if (!['pending', 'paid'].includes(status)) {
    errors.status = ['Please set a valid invoice status.'];
    hasErrors = true;
  }

  if (hasErrors) {
    return {
      message: 'Failed to update invoice due to validation errors.',
      errors,
    };
  }

  // Simulate successful update
  console.log(`Mocking Update: Invoice ID ${id} updated with Customer: ${customerId}, Amount: $${amountStr}, Status: ${status}`);
  return {
    message: 'Invoice updated successfully!',
  };
};

// --- END MOCKED DEPENDENCIES ---

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  
  // Define an action wrapper that correctly matches the useActionState signature:
  // (currentState, formData) => newState.
  const actionWrapper = async (currentState: State, formData: FormData) => {
    // Call the mock server action, passing the required invoice ID and the form data.
    return mockUpdateInvoice(invoice.id, formData);
  };
  
  // useActionState correctly ties the form state to the actionWrapper function.
  const [state, formAction] = useActionState(actionWrapper, initialState);

  return (
    <form action={formAction} className="max-w-xl mx-auto p-4">
      <div className="rounded-xl bg-white shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Invoice</h2>
        
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 focus:border-blue-500 focus:ring-blue-500 transition placeholder:text-gray-500"
              defaultValue={invoice.customer_id}
              aria-describedby="customer-error"
            >
              <option value="default" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
          {/* Display validation error for customerId */}
          {state.errors?.customerId && (
            <div id="customer-error" aria-live="polite" className="mt-2 text-sm text-red-600 font-medium">
              {state.errors.customerId.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                // Divide by 100 to convert cents to dollars for display
                defaultValue={invoice.amount / 100} 
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 focus:border-blue-500 focus:ring-blue-500 transition placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-gray-600" />
            </div>
             {/* Display validation error for amount */}
            {state.errors?.amount && (
              <div id="amount-error" aria-live="polite" className="mt-2 text-sm text-red-600 font-medium">
                {state.errors.amount.map((error: string) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-300 bg-white px-4 py-3">
            <div className="flex gap-6">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 transition hover:bg-yellow-200"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-green-600"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
           {/* Display validation error for status */}
          {state.errors?.status && (
            <div id="status-error" aria-live="polite" className="mt-2 text-sm text-red-600 font-medium">
              {state.errors.status.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </fieldset>

        {/* Display general error/success message */}
        {state.message && (
          <div id="general-message" aria-live="polite" 
            className={`mt-4 text-sm font-semibold p-3 rounded-lg ${
              state.errors ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            <p>{state.message}</p>
          </div>
        )}
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {/* Replaced Next.js Link with standard <a> tag */}
        <a
          href="#" // Mocked href since we don't have routing
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </a>
        <Button type="submit">Update Invoice</Button>
      </div>
    </form>
  );
}