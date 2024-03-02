'use client';

import { BackButton } from '@/components/auth/back-button';
import { Header } from '@/components/auth/header';
import { Social } from '@/components/auth/social';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';

interface CardWrapperProps {
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-10/12 shadow-md md:w-[400px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
