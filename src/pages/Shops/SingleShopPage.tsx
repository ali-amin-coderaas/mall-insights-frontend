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
	const endpoint = Endpoints.shops(Number(accountId));
	console.log(
		"🚀 ~ file: SingleShopPage.tsx:15 ~ SingleShopPage ~ endpoint:",
		endpoint
	);

	const { isLoading, getItemById } = useApi<Shop>(endpoint);
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
		shop && (
			<ShopPageHeader
				shop={shop}
				loading={isLoading}
				setShop={setShop}
				accountId={Number(accountId)}
			/>
		)
	);
};

export default SingleShopPage;
