import React,{useEffect} from 'react'
import ShopRegister from '../../components/Seller/ShopRegister'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SellerRegistration = () => {
  const navigate = useNavigate();
  const { isSeller,isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [isLoading,isSeller])
  return (
    <div >
     <ShopRegister/>
    </div>
  )
}

export default SellerRegistration