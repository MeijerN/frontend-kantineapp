import styles from './Statistics.module.css'
import React, {useEffect} from 'react';
import Task from "../../components/task/Task";
import InnerOuterContainer from "../../components/innerOuterContainer/innerOuterContainer";
import ContentCard from "../../components/contentCard/ContentCard";


function Statistics({navDrawer, toggleNavDrawer, setCurrentPage}) {

    useEffect(() => {
        // Change header currentPage state on page mounting and close drawer
        setCurrentPage("Statistieken");
        toggleNavDrawer(false);
    }, [])

    return (
        <InnerOuterContainer navDrawer={navDrawer} toggleNavdrawer={toggleNavDrawer}>
            <section className={styles.section}>
                <div className={styles["title-sort"]}>
                    <h3 className={styles.h3}>Maandelijks urenoverzicht</h3>
                    {/*ALLEEN LATEN ZIEN BIJ DE MANAGER*/}
                    <figure className={styles.sort}/>
                </div>

                {/*CONTENT VOOR DE MANAGER*/}
                <ContentCard stylingClass="table">
                    <table className={styles.table}>
                        <thead className={styles.thead}>
                        <tr>
                            <th className={styles.th}>Voornaam</th>
                            <th className={styles.th}>Achternaam</th>
                            <th className={styles.th}>Uren p.m.</th>
                            <th className={styles.th}>Uren totaal</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>
                        <tr>
                            <td className={styles.td}>Niek</td>
                            <td className={styles.td}>Meijer</td>
                            <td className={styles.td}>4</td>
                            <td className={styles.td}>56</td>
                        </tr>

                        </tbody>
                    </table>
                </ContentCard>
            </section>
            {/*/!*CONTENT VOOR DE NORMALE USER*!/*/}
            {/*/!*<ContentCard>*!/*/}
            {/*/!*    <p className={styles.p}>Je geregisteerde tijd voor deze maand is: <span className={styles.time}>3 uur</span > en <span className={styles.time}>10 minuten</span></p>*!/*/}
            {/*/!*</ContentCard>*!/*/}
            <section className={styles.section}>
            <div className={styles["title-sort"]}>
                <h3 className={styles.h3}>Voltooide taken</h3>
                <figure className={styles.sort}/>
            </div>

            {/*CONTENT VOOR DE MANAGER*/}
            <ContentCard stylingClass="tasks">
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Niek Meijer"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
                <Task
                    dateAdded="2-5-22"
                    status="Voltooid op 2-4-22"
                    title="Lamp vervangen"
                    completedBy="Peter Pan"
                />
            </ContentCard>

            {/*CONTENT VOOR DE NORMALE GEBRUIKER*/}
            {/*<ListContentCard stylingClass="statistics-user">*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*        />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*    <Task*/}
            {/*        dateAdded="2-5-22"*/}
            {/*        status="Voltooid op 2-4-22"*/}
            {/*        title="Lamp vervangen"*/}
            {/*    />*/}
            {/*</ListContentCard>*/}
            </section>
        </InnerOuterContainer>
    );
}

export default Statistics;