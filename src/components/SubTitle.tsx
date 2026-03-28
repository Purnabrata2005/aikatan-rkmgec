import { cn } from '@/lib/utils';
import React from 'react'

type Props = {
     title: string;
     className?: string
}

const SubTitle: React.FC<Props> = ({ title, className }) => {
     return (
          <h1 className={cn('text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center', className)}>
               {title}
          </h1>
     )
}

export default SubTitle