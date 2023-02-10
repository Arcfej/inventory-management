import { Box, DataTable, Header, Page, PageContent, PageHeader, Text } from "grommet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../store/inventoryReducer";
import ProductActions from "../components/ProductActions";

const MainPage = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory.products);
    const status = useSelector(state => state.inventory.status);
    const error = useSelector(state => state.inventory.error);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchInventory());
        }
    }, [dispatch, status]);

    const AppBar = (props) => (
        <Header
            // background="brand"
            pad={{ left: "medium", right: "small", vertical: "small" }}
            elevation="medium"
            {...props}
        />
    );

    const InventoryTable = () => {
        if (inventory.length === 0 && status === "loading") {
            return (
                <Box align="center" pad="large">
                    <Text>Loading...</Text>
                </Box>
            );
        } else if (status === "failed") {
            return (
                <Box align="center" pad="large">
                    <Text>{error}</Text>
                </Box>
            )
        } else if (status === "succeeded") {
            return (
                <Box align="left" pad="large">
                    <DataTable
                        columns={[
                            {
                                property: "name",
                                header: <Text>Name</Text>,
                                primary: true,
                            },
                            {
                                property: "quantity",
                                header: <Text>Quantity</Text>,
                            },
                            {
                                property: "actions",
                                header: <Text></Text>,
                                render: ({ name, quantity }) => {
                                    return <ProductActions name={name} quantity={quantity}/>;
                                },
                                sortable: false,
                            }
                        ]}
                        data={inventory}
                        placeholder={inventory.length === 0 && <Text>No inventory</Text>}
                    />
                </Box>
            );
        }
    };

    return (
        <Page>
            <AppBar>
                <Text size="large">Inventory management system</Text>
            </AppBar>
            <PageContent>
                <PageHeader title="Inventory"/>
                <InventoryTable/>
            </PageContent>
        </Page>
    );
};

export default MainPage;
