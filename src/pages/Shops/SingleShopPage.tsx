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

	const { getItemById } = useApi<Shop>(endpoint);

	const { error, isLoading, item: shop } = getItemById(Number(shopId));
	const navigate = useNavigate();

	if (error) {
		navigate(Links.AccountLinks.SingleAccount(Number(accountId)));
		throw error;
	}
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
