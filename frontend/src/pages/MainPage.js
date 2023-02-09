import { Box, DataTable, Header, Page, PageContent, PageHeader, Text } from "grommet";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory } from "../store/inventoryReducer";

const MainPage = () => {
    const dispatch = useDispatch();
    const inventory = useSelector(state => state.inventory.products);
    const status = useSelector(state => state.inventory.status);

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
        if (status === "loading") {
            return (
                <Box align="center" pad="large">
                    <Text>Loading...</Text>
                </Box>
            );
        } else if (status === "failed") {
            return (
                <Box align="center" pad="large">
                    <Text>Error fetching inventory</Text>
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
                        ]}
                        data={inventory}
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
