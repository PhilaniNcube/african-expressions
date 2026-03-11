import * as React from 'react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type FieldOrientation = 'vertical' | 'horizontal' | 'responsive';
type DataInvalid = boolean | '' | 'true' | 'false' | undefined;

function isInvalidState(value: DataInvalid) {
  return value === true || value === '' || value === 'true';
}

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: FieldOrientation;
  'data-invalid'?: DataInvalid;
};

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(function Field(
  { orientation = 'vertical', className, 'data-invalid': dataInvalid, ...props },
  ref,
) {
  const invalid = isInvalidState(dataInvalid);

  return (
    <div
      ref={ref}
      role="group"
      data-invalid={invalid || undefined}
      data-orientation={orientation}
      className={cn(
        'group/field flex gap-2',
        orientation === 'vertical' && 'flex-col',
        orientation === 'horizontal' && 'items-start gap-3',
        orientation === 'responsive' && 'flex-col md:grid md:grid-cols-[minmax(0,180px)_1fr] md:items-start md:gap-4',
        className,
      )}
      {...props}
    />
  );
});

export const FieldSet = React.forwardRef<HTMLFieldSetElement, React.FieldsetHTMLAttributes<HTMLFieldSetElement>>(
  function FieldSet({ className, ...props }, ref) {
    return <fieldset ref={ref} className={cn('grid gap-6', className)} {...props} />;
  },
);

export const FieldLegend = React.forwardRef<
  HTMLLegendElement,
  React.HTMLAttributes<HTMLLegendElement> & { variant?: 'legend' | 'label' }
>(function FieldLegend({ className, variant = 'legend', ...props }, ref) {
  return (
    <legend
      ref={ref}
      className={cn(
        variant === 'legend' ? 'text-base font-semibold text-deep' : 'text-sm font-semibold text-deep',
        className,
      )}
      {...props}
    />
  );
});

export const FieldGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FieldGroup({ className, ...props }, ref) {
    return <div ref={ref} className={cn('grid gap-5', className)} {...props} />;
  },
);

export const FieldContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function FieldContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn('grid gap-1.5', className)} {...props} />;
  },
);

export const FieldLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  function FieldLabel({ className, ...props }, ref) {
    return <label ref={ref} className={cn('text-sm font-semibold text-deep', className)} {...props} />;
  },
);

export const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function FieldDescription({ className, ...props }, ref) {
    return <p ref={ref} className={cn('text-sm text-gray-500', className)} {...props} />;
  },
);

type ErrorLike = { message?: string } | string | null | undefined;

export type FieldErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  errors?: ErrorLike[];
};

export const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(function FieldError(
  { className, children, errors, ...props },
  ref,
) {
  const messages = (errors ?? [])
    .map((error) => (typeof error === 'string' ? error : error?.message))
    .filter((message): message is string => Boolean(message));

  if (messages.length === 0 && !children) {
    return null;
  }

  return (
    <div
      ref={ref}
      aria-live="polite"
      className={cn('text-sm text-red-600', className)}
      {...props}
    >
      {messages.length > 1 ? (
        <ul className="list-disc space-y-1 pl-5">
          {messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      ) : (
        messages[0] ?? children
      )}
    </div>
  );
});