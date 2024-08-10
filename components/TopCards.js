import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Link from 'next/link';

const TopCards = ({ bg, textColor, href, icon: Icon, amount, subtitle }) => {
  return (
    <>
      <Card className="w-full rounded-sm">
        <CardBody>

          <Link href={href}>
            <Typography variant="h5" color="blue-gray" className="flex space-x-5 items-center mb-2">
              
              <div style={{ backgroundColor: bg }} className="p-4 rounded-full" >
                <Icon style={{ color: textColor }} className='text-2xl' />
              </div>
              <div>
                <h1 className='font-semibold text-2xl'>{amount}</h1>
                <h1 className='font-medium text-gray-700 text-[0.95rem] tracking-wide'>{subtitle}</h1>
              </div>

            </Typography>
          </Link>
          
        </CardBody>
        
      </Card>
    </>
  );
};

export default TopCards;
