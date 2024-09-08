import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import ShopPageHeader from "./components/ShopPageHeader";

const ShopPage = () => {
	const { accountId } = useParams();
	const { shopId } = useParams();
	const { isLoading, getItemById } = useApi(Endpoints.shops(Number(accountId)));
	const [shop, setShop] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchShop = async () => {
			try {
				const shop = await getItemById(shopId);
				if (!shop) {
					navigate(`/accounts/${accountId}`);
					throw new Error("Shop not found");
				}
				setShop(shop.data.items);
			} catch (error) {
				throw error;
			}
		};
		fetchShop();
	}, [shopId]);
	return <ShopPageHeader account={shop} loading={isLoading} />;
};

export default ShopPage;
