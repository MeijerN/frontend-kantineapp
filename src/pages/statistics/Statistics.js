import styles from './Statistics.module.css'
import React, {useEffect} from 'react';
import NavigationDrawer from "../../components/navigationDrawer/NavigationDrawer";
import ContentCard from "../../components/contentCard/ContentCard";
import ListContentCard from "../../components/listContentCard/ListContentCard";
import Task from "../../components/task/Task";

function Statistics({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Statistieken");
        toggleNavDrawer(false);
    }, [])

    return (
        <main>
            <NavigationDrawer
                navDrawer={navDrawer}
                toggleNavDrawer={toggleNavDrawer}
            />
            <section className="page-section">
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Maandelijks urenoverzicht</h3>
                    {/*ALLEEN LATEN ZIEN BIJ DE MANAGER*/}
                    <figure className={styles.sort}/>
                </div>

                {/*CONTENT VOOR DE MANAGER*/}
                {/*<ListContentCard stylingClass="statistics-manager">*/}
                {/*    <table className={styles.table}>*/}
                {/*        <thead>*/}
                {/*        <tr>*/}
                {/*            <th className={styles.th}>Voornaam</th>*/}
                {/*            <th className={styles.th}>Achternaam</th>*/}
                {/*            <th className={styles.th}>Uren maandelijks</th>*/}
                {/*            <th className={styles.th}>Uren totaal</th>*/}
                {/*        </tr>*/}
                {/*        </thead>*/}
                {/*        <tbody>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}
                {/*        <tr>*/}
                {/*            <td className={styles.td}>Niek</td>*/}
                {/*            <td className={styles.td}>Meijer</td>*/}
                {/*            <td className={styles.td}>4</td>*/}
                {/*            <td className={styles.td}>56</td>*/}
                {/*        </tr>*/}

                {/*        </tbody>*/}
                {/*    </table>*/}
                {/*</ListContentCard>*/}

                {/*/!*CONTENT VOOR DE NORMALE USER*!/*/}
                <ContentCard>
                    <p className={styles.p}>Je geregisteerde tijd voor deze maand is: <span className={styles.time}>3 uur</span > en <span className={styles.time}>10 minuten</span></p>
                </ContentCard>

                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Voltooide taken</h3>
                    <figure className={styles.sort}/>
                </div>

                {/*CONTENT VOOR DE MANAGER*/}
                {/*<ListContentCard stylingClass="statistics-manager">*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Niek Meijer"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*    <Task*/}
                {/*        dateAdded="2-5-22"*/}
                {/*        status="Voltooid op 2-4-22"*/}
                {/*        title="Lamp vervangen"*/}
                {/*        completedBy="Peter Pan"*/}
                {/*    />*/}
                {/*</ListContentCard>*/}

                {/*CONTENT VOOR DE NORMALE GEBRUIKER*/}
                <ListContentCard stylingClass="statistics-user">
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                        />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                    <Task
                        dateAdded="2-5-22"
                        status="Voltooid op 2-4-22"
                        title="Lamp vervangen"
                    />
                </ListContentCard>
            </section>
        </main>
    );
}

export default Statistics;