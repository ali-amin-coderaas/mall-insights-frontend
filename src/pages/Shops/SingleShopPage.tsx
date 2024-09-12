import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import { Links } from "../../shared/Links";
import ShopPageHeader from "./components/ShopPageHeader";
import { Shop } from "./types/shopInterface";

const SingleShopPage = () => {
	const { accountId } = useParams();
	const { shopId } = useParams();
	const endpoint = Endpoints.shops(Number(accountId));
	const navigate = useNavigate();

	const { getItemById } = useApi<Shop>(endpoint);

	const { error, isLoading, item: shop } = getItemById(Number(shopId));

	useEffect(() => {
		if (error) {
			navigate(Links.AccountLinks.SingleAccount(Number(accountId)));
			throw error;
		}
	}, [accountId]);

	return (
		!isLoading && (
			<ShopPageHeader
				shop={shop}
				loading={isLoading}
				accountId={Number(accountId)}
			/>
		)
	);
};

export default SingleShopPage;
