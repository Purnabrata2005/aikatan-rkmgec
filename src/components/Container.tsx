import Title from "@/components/Title"

type Props = {
     id?: string;
     children: React.ReactNode
     title?: string
     props?: any
     titleClassName?: string
}


const Container: React.FC<Props> = ({ children, id, title, props, titleClassName }) => {
     return (
          <section id={id} className={` max-w-screen-xl w-full mx-auto max-md:h-auto min-h-screen px-4 relative ${title ? 'pt-24' : 'pt-28'}`} {...props}>
               {title && <Title title={title} className={titleClassName} />}
               {children}
          </section>
     )
}

export default Container
