import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import { Links } from "../../shared/Links";
import ShopPageHeader from "./components/ShopPageHeader";
import { Shop } from "./types/shopInterface";

// type ItemAPIResponse = APIResponse<Shop>;

const SingleShopPage = () => {
	const { accountId } = useParams();
	const { shopId } = useParams();
	const { isLoading, getItemById } = useApi<Shop>(
		Endpoints.shops(Number(accountId))
	);
	const [shop, setShop] = useState<Shop | undefined>(undefined);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchShop = async () => {
			try {
				const shop = await getItemById(Number(shopId));
				if (!shop) {
					navigate(Links.AccountLinks.SingleAccount(Number(accountId)));
					throw new Error("Shop not found");
				}
				setShop(shop);
			} catch (error) {
				throw error;
			}
		};
		fetchShop();
	}, [shopId]);
	return (
		shop && <ShopPageHeader shop={shop} loading={isLoading} setShop={setShop} />
	);
};

export default SingleShopPage;
