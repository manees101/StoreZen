import React,{useEffect} from 'react'
import ShopLogin from '../../components/Seller/ShopLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SellerLogin = () => {
  const navigate = useNavigate();
  const { isSeller,isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if(isSeller === true){
      navigate(`/dashboard`);
    }
  }, [isLoading,isSeller])
  return (
    <div>
      <ShopLogin/>
    </div>
  )
}

export default SellerLogin