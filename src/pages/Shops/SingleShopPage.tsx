import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import ShopPageHeader from "./components/ShopPageHeader";
import { Shop } from "./types/shopInterface";

const SingleShopPage = () => {
	const { accountId } = useParams();
	const { shopId } = useParams();
	const { isLoading, getItemById } = useApi(Endpoints.shops(Number(accountId)));
	const [shop, setShop] = useState<Shop>();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchShop = async () => {
			try {
				const shop = await getItemById(Number(shopId));
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

export default SingleShopPage;
